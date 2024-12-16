export async function uploadImage(image: File, nationality: string): Promise<string> {
    // 1. Convert file to base64
    const base64String = await readFileAsDataURL(image);
    const base64 = base64String.split(",")[1];
  
    const LAMBDA_ENDPOINT = process.env.NEXT_PUBLIC_LAMBDA_ENDPOINT
    const body = {
      imageBase64: base64,
      nationality
    };

    if (!LAMBDA_ENDPOINT){
      console.error('LAMBDA_ENDPOINT is undefined')
      throw new Error('LAMBDA_ENDPOINT is undefined')
    }
    
    await fetch(`${LAMBDA_ENDPOINT}/dev/upload`, {
      method: "OPTIONS",
      headers: {
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type",
        "Origin": window.location.origin,
      }
    });
  
    const response = await fetch(`${LAMBDA_ENDPOINT}/dev/upload?filename=${image.name}`, {
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