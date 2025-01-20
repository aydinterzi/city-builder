function Card({ label, onClick, isSelected }) {
  return (
    <div
      className={`w-24 h-36 rounded opacity-80 flex items-center justify-center cursor-pointer transition-colors duration-200 ${
        isSelected ? "bg-orange-400" : "bg-orange-200"
      }`}
      onClick={onClick}
    >
      <div className="text-sm font-bold text-center">{label}</div>
    </div>
  );
}

export default Card;
