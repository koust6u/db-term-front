// DefaultModal.jsx
import React, { useState, useEffect } from "react";

const AuthModal = ({ isOpen, closeModal, selectedMember, handleUpdate }) => {
    const [updatedInfo, setUpdatedInfo] = useState({
        role: selectedMember ? selectedMember.role : "NORMAL",
        bannedPeriod: selectedMember ? 7 : 1,
    });

    useEffect(() => {
        // Reset the form when the modal is opened with a new selectedMember
        if (selectedMember) {
            setUpdatedInfo({
                role: selectedMember.role,
                bannedPeriod: 7,
            });
        }
    }, [selectedMember]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the updated information to the parent component for handling the update
        handleUpdate(updatedInfo);
    };

    const handleClose = () => {
        // Close the modal when the close button or overlay is clicked
        closeModal();
    };
    return (
        <div
            className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center ${
                isOpen ? "visible" : "invisible"
            }`}
        >
            <div className="bg-white p-8 max-w-md mx-auto rounded-md" style={{ width: "400px" }}>

                <h2 className="text-xl font-semibold mb-4">사용자 정보 수정</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">권한</label>
                        <div className="mt-1">
                            <select
                                id="role"
                                name="role"
                                value={updatedInfo.role}
                                onChange={(e) => setUpdatedInfo({ ...updatedInfo, role: e.target.value })}
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="NORMAL">일반 사용자</option>
                                <option value="MANAGER">매니저</option>
                                <option value="ADMIN">관리자</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">차단 기간</label>
                        <div className="mt-1">
                            <select
                                id="bannedPeriod"
                                name="bannedPeriod"
                                value={updatedInfo.bannedPeriod}
                                onChange={(e) =>
                                    setUpdatedInfo({ ...updatedInfo, bannedPeriod: parseInt(e.target.value) })
                                }
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value={0}>사면</option>
                                <option value={1}>1일</option>
                                <option value={7}>1주일</option>
                                <option value={30}>1달</option>
                                <option value={60}>2달</option>
                                <option value={90}>3달</option>
                                <option value={180}>6달</option>
                                <option value={999999}>영구정지</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
                            수정하기
                        </button>
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mt-4"
                        >
                            닫기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;