function Progress({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, #24A0B5 ${`${
          33.33 * step
        }%`}, #0E464F ${`${33.33 * step}%`})`,
      }}
      className="bg-border w-full h-1 rounded-md"
    ></div>
  );
}

export default Progress;
