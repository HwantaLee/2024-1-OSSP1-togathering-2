package togathering.Plogging.service.PloggingGroupService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togathering.Plogging.apiPayload.code.status.ErrorStatus;
import togathering.Plogging.apiPayload.exception.handler.AppHandler;
import togathering.Plogging.app.dto.PloggingGroupRequestDTO;
import togathering.Plogging.app.dto.PloggingGroupResponseDTO;
import togathering.Plogging.converter.PloggingGroupConverter;
import togathering.Plogging.domain.*;
import togathering.Plogging.domain.enums.PloggingGroupStatus;
import togathering.Plogging.repository.PloggingCourseRepository.PloggingCourseRepository;
import togathering.Plogging.repository.PloggingGroupRepository.PloggingGroupRepository;
import togathering.Plogging.repository.UserPloggingGroupApplymentRepository.UserPloggingGroupApplymentRepository;
import togathering.Plogging.repository.UserRepository;
import togathering.Plogging.service.UserPloggingGroupApplymentService.UserPloggingGroupApplymentCommandServiceImpl;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PloggingGroupCommandServiceImpl implements PloggingGroupCommandService {
    private final PloggingGroupRepository ploggingGroupRepository;
    private final PloggingCourseRepository ploggingCourseRepository;
    private final UserRepository userRepository;
    private final UserPloggingGroupApplymentRepository applymentRepository;

    private final UserPloggingGroupApplymentCommandServiceImpl applymentCommandService;


    // 플로깅 그룹 조회
    public List<PloggingGroupResponseDTO.getPloggingGroupListDTO> getPloggingGroupList() {
        List<PloggingGroup> ploggingGroupList = ploggingGroupRepository.findAll();
        return ploggingGroupList.stream()
                .map(PloggingGroupConverter::getPloggingGroupListDTO)
                .collect(Collectors.toList());
    }

    // 플로깅 그룹 생성
    @Transactional
    public PloggingGroupResponseDTO.CreatePloggingGroupDTO createPloggingGroup(PloggingGroupRequestDTO.CreatePloggingGroupDTO request) throws AppHandler {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_USER)); // 존재하지 않는 user
        PloggingCourse course = ploggingCourseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_COURSE)); // 존재하지 않는 course

        // 객체 생성
        PloggingGroup ploggingGroup = PloggingGroup.builder()
                .name(request.getGroupName())
                .address(request.getAddress())
                .date_of_progress(request.getDateOfProgress())
                .status(PloggingGroupStatus.BEFORE)
                .ploggingCourse(course)
                .build();

        // db에 저장
        ploggingGroupRepository.save(ploggingGroup);

        // applyment 객체 생성 - applyment service에서 호출
        applymentCommandService.createApplyment(request.getUserId(), ploggingGroup.getId(), true);

        // plogging group 반환
        return PloggingGroupConverter.toCreatePloggingGroupDTO(ploggingGroup);
    }

    // 유저가 그룹에 참여
    @Transactional
    public void joinPloggingGroup(Long groupId, PloggingGroupRequestDTO.JoinPloggingGroupDTO request) throws AppHandler {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_USER));
        PloggingGroup ploggingGroup = ploggingGroupRepository.findById(groupId)
                .orElseThrow(() -> new AppHandler(ErrorStatus.NOT_FOUND_GROUP));

        // 중복 참여 방지
        boolean alreadyMember = ploggingGroup.getUserPloggingGroupApplyments().stream()
                .anyMatch(a -> a.getUser().equals(user));
        if (!alreadyMember) {
            // applyment 객체 생성 - applyment service에서 호출
            applymentCommandService.createApplyment(request.getUserId(), groupId, false);
        } else {
            throw new AppHandler(ErrorStatus.ALREADY_JOIN_GROUP);
        }

        // 변경 사항 저장
        ploggingGroupRepository.save(ploggingGroup);
    }

    // 플로깅 그룹 탈퇴
    @Transactional
    public void exitPloggingGroup(Long groupId, PloggingGroupRequestDTO.ExitPloggingGroupDTO request) throws AppHandler {
        applymentCommandService.exitPloggingGroup(request.getUserId(), groupId);
    }

}
