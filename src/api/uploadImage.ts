export async function uploadImage(image: File, nationality: string): Promise<string> {
    // 1. Convert file to base64
    const base64String = await readFileAsDataURL(image);
    const base64 = base64String.split(",")[1];
  
    const body = {
      imageBase64: base64,
      nationality
    };
    
    await fetch('https://zujssf5jhl.execute-api.eu-west-2.amazonaws.com/dev/upload', {
      method: "OPTIONS",
      headers: {
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type",
        "Origin": window.location.origin,
      }
    });
  
    const response = await fetch(`https://zujssf5jhl.execute-api.eu-west-2.amazonaws.com/dev/upload?filename=${image.name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    });
  
    const result = await response.json();
    if (response.ok) {
      return result.message;
    } else {
      throw new Error(`Error: ${result.message}`);
    }
  }

  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Error reading file.'));
      };
      reader.readAsDataURL(file);
    });
  }