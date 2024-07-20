"use client"




function UserDetails({user}){

    function getRandomDate() {
      
      const month = Math.floor(Math.random() * 12) + 1;
  
     
      const maxDay = getMaxDaysInMonth(month);
      const day = Math.floor(Math.random() * maxDay) + 1;
  
     
      const year = Math.floor(Math.random() * (2025 - 2000 + 1)) + 2000;
  
     
      const dateString = `${month}/${day}/${year}`;
  
      return dateString;
  }
  
  
  function getMaxDaysInMonth(month) {
      switch (month) {
          case 2: 
              return 28; 
          case 4: case 6: case 9: case 11: 
              return 30;
          default: 
              return 31;
      }
  }
  
  const randomDate = getRandomDate();
  
    
    const handleImageError = (event) => {
      event.target.src = avatar;
    };
  
    return(
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center gap-4">
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <img className="aspect-square h-full w-full"
            src={user?.avatar || avatar}
            alt={user?.profile?.firstName}
            onError={handleImageError}
            />
          </span>
          <div>
            <h2 className="font-semibold">{user?.profile?.firstName} {user?.profile?.lastName}</h2>
            <p className="text-muted-foreground text-sm"> {user?.profile?.email}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          <div>
            <h3 className="font-semibold">Job Position</h3>
            <p>{user?.jobTitle}</p>
          </div>
          <div>
            <h3 className="font-semibold">Bio</h3>
            <p>{user?.Bio}</p>
          </div>
          <div>
            <h3 className="font-semibold">Location</h3>
            <p>Seattle, WA</p>
          </div>
          <div>
            <h3 className="font-semibold">Joined</h3>
            <p>{randomDate}</p>
          </div>
        </div>
      </div>
    </div>
    )
  }

  export default UserDetails