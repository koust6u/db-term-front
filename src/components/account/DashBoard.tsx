// src/components/Dashboard.tsx
import React, {useEffect, useState} from 'react';
import LogInfo from './LogInfo';
import DepositForm from './DepositForm';
import TransferForm from './TransferForm'; // Import the new component

const Dashboard: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('logInfo');
    const [authLevel, setAuthLevel] = useState<number | null>(null);

    useEffect(() => {
        // Assuming you have a function to fetch the auth level
        const fetchAuthLevel = async () => {
            try {
                const response = await fetch("http://localhost:8080/myAuth",{
                    credentials: 'include'
                });
                const data = await response.json();
                setAuthLevel(data);
            } catch (error) {
                console.error("Error fetching auth level:", error);
            }
        };

        fetchAuthLevel();
    }, []);

    const renderSelectedComponent = () => {
        switch (selectedOption) {
            case 'logInfo':
                return <LogInfo />;
            case 'depositForm':
                return <DepositForm />;
            case 'transferForm':
                return <TransferForm />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">계좌 관리 대시보드</h1>
            <label className="block mb-4">
                기능 선택:
                <select
                    className="ml-2 p-2 border border-gray-300 rounded"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="logInfo">계좌 조회</option>
                    {authLevel && authLevel > 2 && (
                        <>
                            <option value="depositForm">계좌 충전</option>
                            <option value="transferForm">계좌 송금</option>
                        </>
                    )}
                </select>
            </label>

            {renderSelectedComponent()}
        </div>
    );
};

export default Dashboard;