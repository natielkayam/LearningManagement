import { createCourseClient } from "../../../shared/http/httpClient";

const courseClient = createCourseClient();
const courseAxios = courseClient.getInstance(); 

export { courseClient };
export default courseAxios;
