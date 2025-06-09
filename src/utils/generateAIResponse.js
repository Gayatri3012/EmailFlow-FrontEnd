export const generateAIResponse = async ({ prompt }) => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://emailflow-backend.onrender.com/emailFlow/generate-airesponse", {
      // const response = await fetch("http://localhost:8080/emailFlow/generate-airesponse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ prompt }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to generate response");
    }
  
    return await response.json(); 
  };
  