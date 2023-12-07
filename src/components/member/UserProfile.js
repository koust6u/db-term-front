import React, { useState, useEffect } from 'react';

const UserProfile = () => {
    const [profileInfo, setProfileInfo] = useState({
        message: '',
        nickname: '',
        url: '',
    });

    const [editMode, setEditMode] = useState(false);
    const [editedProfileInfo, setEditedProfileInfo] = useState({});

    useEffect(() => {
        // Fetch user profile information when the component mounts
        fetchProfileInfo();
    }, []);

    useEffect(() => {
        // Fetch user profile information when editMode changes to false
        if (!editMode) {
            fetchProfileInfo();
        }
    }, [editMode]);

    const fetchProfileInfo = async () => {
        try {
            const response = await fetch('http://localhost:8080/member/profile', {
                credentials: 'include',
            });
            const data = await response.json();
            setProfileInfo(data);
        } catch (error) {
            console.error('Error fetching user profile information:', error);
        }
    };

    const handleEditClick = () => {
        setEditMode(true);
        // Set the editedProfileInfo state to the current profile info
        setEditedProfileInfo({ ...profileInfo });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Update the editedProfileInfo state when input changes
        setEditedProfileInfo({
            ...editedProfileInfo,
            [name]: value,
        });
    };

    const handleSaveClick = async () => {
        try {
            const updatedInfo = {
                message: editedProfileInfo.message,
                nickname: editedProfileInfo.nickname,
                url: editedProfileInfo.url,
            };

            // Send a PATCH request to update user profile information
            const response = await fetch('http://localhost:8080/member/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updatedInfo),
            });

            if (response.ok) {
                // If the update is successful, exit edit mode
                setEditMode(false);
            } else {
                console.error('Error updating user profile information');
            }
        } catch (error) {
            console.error('Error updating user profile information:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">프로필</h1>

            {editMode ? (
                // Display input fields for editing when in edit mode
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">인사말:</label>
                        <textarea
                            name="message"
                            value={editedProfileInfo.message}
                            onChange={handleInputChange}
                            className="w-full border rounded-md p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">닉네임:</label>
                        <input
                            type="text"
                            name="nickname"
                            value={editedProfileInfo.nickname}
                            onChange={handleInputChange}
                            className="w-full border rounded-md p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">프로필 이미지 URL:</label>
                        <input
                            type="text"
                            name="url"
                            value={editedProfileInfo.url}
                            onChange={handleInputChange}
                            className="w-full border rounded-md p-2"
                        />
                    </div>

                    <button
                        onClick={handleSaveClick}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
                    >
                        저장
                    </button>
                    <button onClick={() => setEditMode(false)} className="text-gray-500">
                        취소
                    </button>
                </>
            ) : (
                // Display user profile information when not in edit mode
                <>
                    <p className="text-gray-700 mb-2">
                        <span className="font-bold">인사말:</span> {profileInfo.message}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <span className="font-bold">닉네임:</span> {profileInfo.nickname}
                    </p>
                    <div className="mb-2">
                        <span className="font-bold block mb-1">프로필 이미지:</span>
                        <img
                            src={profileInfo.url}
                            alt="프로필 이미지"
                            className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
                        />
                    </div>

                    <button onClick={handleEditClick} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                        프로필 편집
                    </button>
                </>
            )}
        </div>
    );
};

export default UserProfile;
