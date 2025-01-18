function Card({ label, onClick }) {
  return (
    <div
      className="w-36 h-52 bg-orange-200 rounded opacity-60 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <div className="text-xl font-bold">{label}</div>
    </div>
  );
}

export default Card;
