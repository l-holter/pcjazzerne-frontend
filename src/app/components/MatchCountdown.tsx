import { useEffect, useState } from "react";
import Image from "next/image";
import { pb, FILE_URL } from "../lib/pocketbase";

export default function MatchCountdown() {
  const todaysDate = new Date();

  const [opponentTeamName, setOpponentTeamName] = useState("")
  const [matchStart, setMatchStart] = useState(new Date())
  const [teamImageUrl, setTeamImageUrl] = useState("")


  const calculateTimeRemaining = () => {
    const currentTime = new Date();
    const timeDifference = matchStart.getTime() - currentTime.getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {

    // Fetch next match
    const getNextMatch = async () => {

      const record = await pb.collection('matches').getFirstListItem(`startTime <= '${todaysDate}'`, {
        expand: 'startTime,opponentTeamName',
      })
      //console.log(record)
      .then((match) => {
        const imageUrl = FILE_URL + "matches/" + match.id + "/" + match.opponentTeamImage
        setOpponentTeamName(match.opponentTeam)
        setMatchStart(new Date(match.startTime))
        setTeamImageUrl(imageUrl) 
      })
      .catch((error) => {
        console.log(error)
      })
    };

    getNextMatch();
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [matchStart]);
  

  return (
    <div className="w-full h-1/2 bg-cover bg-center bg-no-repeat bg-[url('/matchBackground.jpg')] flex flex-col justify-center items-center">

      {/* Title component */}
      <div className="h-1/6 w-1/5 text-center mt-20 mb-10">
        <h1 className="text-pcjazzerne-gold font-bold text-5xl">Neste Match</h1>
      </div>

      {/* Team names and images */}
      <div className="h-3/6 w-1/5 flex justify-around items-center text-center">

        {/* Team name and image */}
        <div className="h-100 w-1/3 flex flex-col justify-center items-center text-center">
          <Image
            src="/logo/pc_logo.png"
            alt="PC Jazzerne Logo"
            width={130}
            height={130}
            className="mb-5"
          />
          <h1 className="text-pcjazzerne-gold font-bold text-xl">PCJazzerne</h1>
        </div>

        <h1 className="text-pcjazzerne-gold text-6xl">V</h1>

        {/* Team name and image */}
        <div className="h-100 w-1/3 flex flex-col justify-center items-center">
          <Image
            src={teamImageUrl}
            alt="Opponent team logo"
            width={150}
            height={150}
            className=""
          />
          <h1 className="text-pcjazzerne-gold font-bold text-ml">{opponentTeamName}</h1>
        </div>
      </div>

      {/* Countdown component */}
      <div className="h-2/6 w-1/3 mt-20 mb-20 flex items-center justify-center text-center">

        {/* Days */}
        <div className="h-full w-full">
          <h1 className="text-6xl pb-4">{timeRemaining.days}</h1>
          <p className="font-extralight text-base">dager</p>
        </div>

        {/* Hours */}
        <div className="h-full w-full">
          <h1 className="text-6xl pb-4">{timeRemaining.hours}</h1>
          <p className="font-extralight text-base">timer</p>
        </div>

        {/* Minutes */}
        <div className="h-full w-full">
          <h1 className="text-6xl pb-4">{timeRemaining.minutes}</h1>
          <p className="font-extralight text-base">minutter</p>
        </div>

        {/* Seconds */}
        <div className="h-full w-full">
          <h1 className="text-6xl pb-4">{timeRemaining.seconds}</h1>
          <p className="font-extralight text-base">sekunder</p>
        </div>

      </div>

    </div>
  )
}