import Progress from "./Progress";

const title: string[] = ["Ticket Selection", "Attendee Details", "Ready"];

function SectionTitle({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      <div className="w-full flex flex-col justify-start items-start gap-3 sm:flex-row sm:justify-between sm:items-center">
        <h3 className="text-2xl text-secondary jeju-myeongjo">
          {title[step - 1]}
        </h3>
        <p className="text-lg">Step {step}/3</p>
      </div>
      <Progress step={step} />
    </div>
  );
}

export default SectionTitle;
