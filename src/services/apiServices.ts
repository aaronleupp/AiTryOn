// apiService.ts
export async function submitForm(suitImage: File, photoImage: File, garmentDes: string) {
    const formData = new FormData();
    formData.append("garm_img", suitImage);
    formData.append("human_img", photoImage);
    formData.append("garment_des", garmentDes);

    try {
      const response = await fetch("http://localhost:8000/api/tryon/", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const data = await response.json();
      return data.output;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("There was an error processing your request");
    }
  }
