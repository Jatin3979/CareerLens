import axios from "axios";

const api= axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

export const getInterviewReport = async ( {jobDescription, selfDescription, resumeFile } ) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const response = await api.post("/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};


export const getInterviewReportById = async ( interviewId ) => {
    // console.log("Fetching interview report for ID:", interviewId);
    const response = await api.get(`/interview/report/${interviewId}`);
    // console.log("Fetched report data:", response.data);
    return response.data;
}

export const getAllInterviewReports = async () => {
    const response = await api.get("/interview/");
    return response.data;
}
