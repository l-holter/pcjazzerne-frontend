import Image from 'next/image';
import DOMPurify from 'dompurify';
import { FILE_URL } from '../lib/pocketbase';

export interface PlayerProps {
  collectionId: string;
  id: string;
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
    <div className="bg-white p-8 m-2 rounded-lg shadow-md inline-block max-w-xs">
      <div className="mb-4 text-center">
        <h2 className="text-xl text-gray-800 font-bold mb-2">{fullName}</h2>
        <p className="text-gray-700 mb-2">
          {shirtName} - #{shirtNumber}
        </p>
        <p className="text-gray-700 mb-2">{position}</p>
      </div>
      <div className="w-full">
        <Image
          src={FILE_URL + collectionId + '/' + id + '/' + picture + '?100x0'}
          alt={`Picture of ${fullName}`}
          layout="responsive"
          width={400}
          height={500}
        />
      </div>
      <div className="text-gray-700 mt-2">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(textField),
          }}
        />
      </div>
    </div>
  );
};

export default Player;
