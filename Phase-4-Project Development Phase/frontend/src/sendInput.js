const setintoBackend = async (inputData) => {
  try {
    console.log(inputData);
    const response = await fetch("http://localhost:5000/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors", // Add this option
      body: JSON.stringify(inputData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data; // Handle the response data if needed
  } catch (error) {
    console.error("Error sending input:", error);
  }
};

export { setintoBackend };
