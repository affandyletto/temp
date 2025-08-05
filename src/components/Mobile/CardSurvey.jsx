import { useNavigate, useParams } from 'react-router-dom';


export const CardSurvey = ({ survey }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/survey/${survey.id}`);
  };

  return (
    <div onClick={handleClick} className="flex-1 min-w-0 py-2 bg-white rounded-lg border border-gray-300 flex flex-col gap-4">
      <div className="px-2 pb-2 border-b border-slate-200 flex items-center">
        <div className="flex-1 flex flex-col">
          <div className="text-gray-800 text-xs font-semibold truncate">{survey.name}</div>
          <div className="text-zinc-500 text-[10px]">{survey.lastUpdated}</div>
        </div>
      </div>
      <div className="px-2">
        <img 
          className="w-full h-36 object-cover rounded" 
          src={survey.thumbnail || "https://placehold.co/187x141"} 
          alt={survey.name}
        />
      </div>
    </div>
  );
};