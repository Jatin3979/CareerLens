import {createContext, useContext, useState} from "react";


export const InterviewContext = createContext();

export const InterviewProvider = ({children}) => {
    const [interviewReport, setInterviewReport] = useState(null);
    const [allInterviewReports, setAllInterviewReports] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <InterviewContext.Provider value={{ interviewReport, setInterviewReport, allInterviewReports, setAllInterviewReports, loading, setLoading }}>
            {children}
        </InterviewContext.Provider>
    );
}