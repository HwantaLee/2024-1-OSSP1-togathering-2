package togathering.Plogging.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class PloggingGroupRequestDTO {

        @Getter
        @NoArgsConstructor
        public static class CreatePloggingGroupDTO {
                private String groupName;
                private String address;
                private Long courseId;
                private LocalDateTime dateOfProgress;
                private Long userId; // 아직 헤더가 없어서 임시로 지정
        }

        @Getter
        @NoArgsConstructor
        public static class JoinPloggingGroupDTO {
                private Long userId; // 아직 헤더가 없어서 임시로 지정
        }

        @Getter
        @NoArgsConstructor
        public static class ExitPloggingGroupDTO {
                private Long userId; // 아직 헤더가 없어서 임시로 지정
        }

}
