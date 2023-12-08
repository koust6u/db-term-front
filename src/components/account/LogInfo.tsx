import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AccountInfo as AccountInfoType, LogForm } from './types';

const LogInfo: React.FC = () => {
    const [accountInfo, setAccountInfo] = useState<AccountInfoType | null>(null);
    const [selectedLogType, setSelectedLogType] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const logsPerPage = 10;

    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const response = await axios.get<AccountInfoType>('http://35.216.75.115:8080/account');
                setAccountInfo(response.data);
            } catch (error) {
                console.error('Error fetching account info:', error);
            }
        };

        fetchAccountInfo();
    }, [selectedLogType]); // Only fetch when selectedLogType changes


    const handleLogTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLogType(event.target.value);
        setCurrentPage(1);
    };

    const renderLogs = (logs: LogForm[]) => {
        const indexOfLastLog = currentPage * logsPerPage;
        const indexOfFirstLog = indexOfLastLog - logsPerPage;
        const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

        return (
            <table className="w-full border border-collapse">
                <thead>
                <tr className="border-b">
                    <th className="py-2">금액</th>
                    <th className="py-2">일시</th>
                    <th className="py-2">착금자</th>
                    <th className="py-2">송금자</th>
                    <th className="py-2">총액</th>
                </tr>
                </thead>
                <tbody>
                {currentLogs.map((log: LogForm) => (
                    <tr key={log.createdAt} className="border-b">
                        <td className="py-2">{log.amount ?? 'N/A'}원</td>
                        <td className="py-2">{formatDateTime(log.createdAt)}</td>
                        <td className="py-2">{log.to ?? 'N/A'}</td>
                        <td className="py-2">{log.from ?? 'N/A'}</td>
                        <td className="py-2">{log.totalAmount !== null ? `${log.totalAmount}원` : 'N/A'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const formatDateTime = (dateTime: string) => {
        const formattedDateTime = new Date(dateTime).toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
        return formattedDateTime;
    };

    const getTotalPages = () => {
        switch (selectedLogType) {
            case 'all':
                return Math.ceil((accountInfo?.allLogs?.length || 0) / logsPerPage) || 1;
            case 'sent':
                return Math.ceil((accountInfo?.originLogs?.length || 0) / logsPerPage) || 1;
            case 'received':
                return Math.ceil((accountInfo?.destLogs?.length || 0) / logsPerPage) || 1;
            default:
                return 1;
        }
    };

    return (
        <div className="container mx-auto mt-8 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">계좌 조회</h1>

            {accountInfo ? (
                <div className="w-full max-w-2xl">
                    <p className="mb-4">전체 계좌 금액: {accountInfo.credit}원</p>

                    <label className="block mb-4">
                        거래 내역 유형:
                        <select
                            className="ml-2 p-2 border border-gray-300 rounded"
                            value={selectedLogType}
                            onChange={handleLogTypeChange}
                        >
                            <option value="all">전체 내역</option>
                            <option value="sent">보낸 내역</option>
                            <option value="received">받은 내역</option>
                        </select>
                    </label>

                    <h2 className="text-lg font-semibold my-4">거래 내역</h2>
                    {renderLogs(
                        selectedLogType === 'all'
                            ? accountInfo.allLogs
                            : selectedLogType === 'sent'
                                ? accountInfo.originLogs
                                : accountInfo.destLogs
                    )}

                    <div className="flex justify-center mt-4">
                        {Array.from({ length: getTotalPages() }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`mx-1 p-2 border rounded focus:outline-none ${
                                    currentPage === index + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'hover:bg-blue-500 hover:text-white'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <p>데이터를 불러오는 중입니다...</p>
            )}
        </div>
    );
};

export default LogInfo;
