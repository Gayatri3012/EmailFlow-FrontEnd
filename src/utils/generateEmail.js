export const generateEmail = async ({ category, prompt }) => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://emailflow-backend.onrender.com/emailFlow/generate-email", {
      // const response = await fetch("http://localhost:8080/emailFlow/generate-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ category, prompt }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to generate email");
    }
  
    return await response.json(); 
  };
  