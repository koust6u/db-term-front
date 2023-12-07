import React, { useState, useEffect } from 'react';

const Member = () => {
    const [userInfo, setUserInfo] = useState({
        userId: '',
        username: '',
        birthday: '',
        email: '',
    });

    const [editMode, setEditMode] = useState(false);
    const [editedUserInfo, setEditedUserInfo] = useState({});

    useEffect(() => {
        // Fetch user information when the component mounts
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await fetch('http://localhost:8080/member',
                {
                    credentials: 'include',
                });
            const data = await response.json();
            setUserInfo(data);
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };

    const handleEditClick = () => {
        setEditMode(true);
        // Set the editedUserInfo state to the current user info
        setEditedUserInfo({ ...userInfo });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Update the editedUserInfo state when input changes
        setEditedUserInfo({
            ...editedUserInfo,
            [name]: value,
        });
    };

    const handleSaveClick = async () => {
        try {
            // Send a PATCH request to update user information
            const response = await fetch('http://localhost:8080/member', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedUserInfo),
            });

            if (response.ok) {
                // If the update is successful, update the userInfo state and exit edit mode
                setUserInfo(editedUserInfo);
                setEditMode(false);
            } else {
                console.error('Error updating user information');
            }
        } catch (error) {
            console.error('Error updating user information:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">개인 정보</h1>

            {editMode ? (
                // Display input fields for editing when in edit mode
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={editedUserInfo.username}
                            onChange={handleInputChange}
                            className="w-full border rounded-md p-2"
                            disabled // Disable editing of userId
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Birthday:</label>
                        <input
                            type="text"
                            name="birthday"
                            value={editedUserInfo.birthday}
                            onChange={handleInputChange}
                            className="w-full border rounded-md p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={editedUserInfo.email}
                            onChange={handleInputChange}
                            className="w-full border rounded-md p-2"
                        />
                    </div>

                    <button
                        onClick={handleSaveClick}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
                    >
                        Save
                    </button>
                    <button onClick={() => setEditMode(false)} className="text-gray-500">
                        Cancel
                    </button>
                </>
            ) : (
                // Display user information when not in edit mode
                <>
                    <p className="text-gray-700 mb-2">
                        <span className="font-bold">성명:</span> {userInfo.username}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <span className="font-bold">생년월일:</span> {userInfo.birthday}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <span className="font-bold">Email:</span> {userInfo.email}
                    </p>

                    <button onClick={handleEditClick} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                        Edit Profile
                    </button>
                </>
            )}
        </div>
    );
};

export default Member;
