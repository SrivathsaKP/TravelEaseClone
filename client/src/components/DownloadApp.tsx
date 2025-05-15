import { Button } from "@/components/ui/button";

const DownloadApp = () => {
  return (
    <div className="bg-primary py-12 mb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-white heading mb-4">Download Our Mobile App</h2>
            <p className="text-blue-100 mb-6">Get exclusive deals and manage your bookings on the go with our easy-to-use mobile app.</p>
            <div className="flex space-x-4">
              <Button variant="outline" className="bg-white text-primary hover:bg-blue-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm3.5-11.5l-5 3-3 5 5-3 3-5z" />
                </svg>
                App Store
              </Button>
              <Button variant="outline" className="bg-white text-primary hover:bg-blue-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 4.5l-10 5L13 14.5V4.5z" />
                </svg>
                Google Play
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500" 
              alt="TravelEase mobile app" 
              className="w-64 h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
