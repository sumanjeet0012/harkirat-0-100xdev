import axios from "axios";

async function getUserDetails() {
  const response = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
	return response.data;
}

export default async function Home() {
  const res = await getUserDetails()
  return (
    <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div className="border p-8 rounded">
                <div>
                    Name: {res?.name}
                </div>
                
                {res?.email}
            </div>
        </div>
    </div>
    
  );
}
