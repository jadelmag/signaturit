import { COLOR } from "@/constants/colors.constants";
import { STATUS } from "@/constants/status.constants";

export const getColorByStatus = (status: string) => {
    if (status === STATUS.PENDING) {
        return COLOR.YELLOW;
    } else if (status === STATUS.DECLINED) {
        return COLOR.RED;
    } else {
        return COLOR.GREEN;
    }
}