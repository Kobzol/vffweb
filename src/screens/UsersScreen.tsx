import { useEffect, useState } from "react";
import { UserSummary } from "../api/api";
import { callGuard, createUsersApi } from "../common/service";
import { LoggedScreenWrapper } from "../components/LoggedScreenWrapper";
import { LoadingWrapper } from "../components/LoadingWrapper";
import { Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";


async function downloadUsers(setData: (d: UserSummary[]) => void) {
    const api = createUsersApi();
    const data = await callGuard(async () => {
        const result = await api.getAllUserSummariesUsersSummariesGet();
        return result ? result.data : [];
    });
    setData(data ? data : []);
}


export function UsersScreen() {
    const [data, setData] = useState<UserSummary[] | null>(null);
    useEffect(() => {
        downloadUsers(setData)
    }, [])

    return (<LoggedScreenWrapper title="Users">
        <LoadingWrapper loaded={data !== null}>
            <Table sx={{ maxWidth: 400 }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell align="right"># recordings</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((userSummary) => (
                        <TableRow key={userSummary.user.id}>
                            <TableCell align="right"><Link href="#">{userSummary.user.id}</Link></TableCell>
                            <TableCell>{userSummary.user.name}</TableCell>
                            <TableCell>{userSummary.user.role}</TableCell>
                            <TableCell align="right">{userSummary.samples_count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </LoadingWrapper>
    </LoggedScreenWrapper>);
}