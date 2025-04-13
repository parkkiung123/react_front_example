import { useAuth } from '../utils/AuthContext';
import { requestFetch } from '../utils/ApiFetch';
import { URL } from "../utils/Config";
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Student {
    id: number;
    name: string;
    classNum: number;
    teacher: string;
    korean: number;
    english: number;
    math: number;
    science: number;
    history: number;
} 

const MainPage = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const { logout } = useAuth();
    useEffect(() => {
        try {
            const raw = sessionStorage.getItem('isLoggedIn');
            let isValid = false;
            let parsed;
            if (raw) {
              try {
                parsed = JSON.parse(raw);
                // 예: id와 role이 있는지 확인
                if (parsed.id && parsed.role) {
                  isValid = true;
                }
              } catch (e) {
                // JSON 파싱 실패
                isValid = false;
              }
            }
            if (!isValid) return;
            if (parsed.role === "admin") {
                requestFetch(URL.STUDENTS, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }, (resp) => {
                    setStudents(resp._embedded.students);
                }, (err) => {
                    console.log(err);
                });
            } else if (parsed.role === "user") {
                requestFetch(URL.STUDENTS + `/${parsed.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }, (resp) => {
                    setStudents([resp]);
                }, (err) => {
                    console.log(err);
                });
            } else {
                return;
            }
            
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleLogout = () => {
        logout();
    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>학번</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>반</TableCell>
                            <TableCell>담임</TableCell>
                            <TableCell>국어</TableCell>
                            <TableCell>영어</TableCell>
                            <TableCell>수학</TableCell>
                            <TableCell>과학</TableCell>
                            <TableCell>국사</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.classNum}</TableCell>
                                <TableCell>{student.teacher}</TableCell>
                                <TableCell>{student.korean}</TableCell>
                                <TableCell>{student.english}</TableCell>
                                <TableCell>{student.math}</TableCell>
                                <TableCell>{student.science}</TableCell>
                                <TableCell>{student.history}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </>
    );
}
export default MainPage;
