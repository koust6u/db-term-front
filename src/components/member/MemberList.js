import React, { useState, useEffect } from "react";
import DefaultModal from "./AuthModal";
import Pagination from "../Pagination";
import AuthModal from "./AuthModal";

const MAX_BODY_LENGTH = 150;
const ITEMS_PER_PAGE = 5;

const MemberList = () => {
    const [members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch("http://35.216.75.115:8080/member/all", {
                method: "GET",
                credentials: "include",
            });
            if (response.status === 403) {
                alert("403 Forbidden. Please contact the administrator.");
                return;
            }

            if (response.status === 400 || response.status === 500) {
                alert("Login is required.");
                window.location.href = '/Login'
                return;
            }

            const data = await response.json();
            setMembers(data);
        } catch (error) {
            console.error("Error fetching members:", error);
            setMembers([]);
        }
    };

    const renderMembers = () => {
        if (!Array.isArray(members) || members.length === 0) {
            return (
                <div className="text-center mt-8">
                    <p className="text-gray-600 text-lg mb-4">등록된 회원이 없습니다.</p>
                </div>
            );
        }

        const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
        const currentItems = members.slice(indexOfFirstItem, indexOfLastItem);

        return (
            <div>
                <ul className="space-y-4">
                    {currentItems.map((member) => (
                        <li
                            key={member.userId}
                            className="flex bg-white p-4 rounded shadow-md transition duration-300 hover:shadow-lg"
                        >
                            <div className="flex-shrink-0 w-25 h-25">
                                <img
                                    src={member.url || "https://cdn.icon-icons.com/icons2/1465/PNG/512/118man2_100675.png"}
                                    alt={member.name}
                                    className="w-52 h-52 object-cover rounded-4 "
                                />
                            </div>

                            <div className="ml-4">



                                <div className="ml-4">
                                    <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
                                    <div className="mt-4">
                                        <p>
                                            회원 ID: {member.userId || "N/A"}
                                        </p>
                                        <p>
                                            전화번호: {member.tel || "N/A"}
                                        </p>
                                        <p>
                                            회원 가입 시간: {formatDate(member.signUpTime) || "N/A"}
                                        </p>
                                        <p>
                                            회원 권한: {member.role || "N/A"}
                                        </p>
                                        <p>
                                            대출한 도서 수: {member.bookCount || 0}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleUpdateView(member)}
                                    >
                                        수정하기
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={members.length} paginate={paginate} />
                <AuthModal
                    isOpen={isModalOpen}
                    closeModal={() => closeModal()}
                    selectedMember={selectedMember}
                    handleUpdate={handleUpdate}
                />
            </div>
        );
    };

    const handleUpdateView = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const handleUpdate = async (updatedInfo) => {
        try {
            const response = await fetch("http://35.216.75.115:8080/member/auth", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    role: updatedInfo.role,
                    bannedPeriod: updatedInfo.bannedPeriod,
                    target: selectedMember.userId,
                }),
            });

            if (response.status === 200) {
                // Update the local state with the updated information
                setMembers((prevMembers) =>
                    prevMembers.map((member) =>
                        member.userId === selectedMember.userId
                            ? { ...member, role: updatedInfo.role }
                            : member
                    )
                );

                closeModal();
            } else if (response.status === 403) {
                alert("관리자에게 문의하세요.");
            } else if (response.status === 400 || response.status === 500) {
                alert("로그인이 필요합니다.");
            }
        } catch (error) {
            console.error("Error updating member:", error);
        }
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const closeModal = () => {
        setSelectedMember(null);
        setIsModalOpen(false);
    };

    const formatDate = (dateString) => {
        if (dateString) {
            return new Date(dateString).toLocaleString();
        }
        return null;
    };
    const truncateText = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">회원 목록</h1>
            {renderMembers()}
        </div>
    );
};

export default MemberList;