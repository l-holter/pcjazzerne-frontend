import Image from 'next/image';
import DOMPurify from "dompurify";
import { FILE_URL } from '../lib/pocketbase';

export interface PlayerProps {
  collectionId: string,
  id: string,
  fullName: string;
  shirtName: string;
  shirtNumber: number;
  position: string;
  picture: string;
  textField: string;
}

const Player: React.FC<PlayerProps> = ({
  collectionId,
  id,
  fullName,
  shirtName,
  shirtNumber,
  position,
  picture,
  textField,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="relative w-full h-40 mb-4">
        <Image
          src={FILE_URL+collectionId+"/"+id+"/"+picture}
          alt={`Picture of ${fullName}`}
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>
      <div>
        <h2 className="text-xl text-gray-800 font-bold mb-2">{fullName}</h2>
        <p className="text-gray-700 mb-2">
          {shirtName} - #{shirtNumber}
        </p>
        <p className="text-gray-700 mb-2">{position}</p>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(textField) }}
        />
      </div>
    </div>
  );
};

export default Player;
