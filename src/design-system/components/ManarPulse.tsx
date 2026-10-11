import "./ManarPulse.css";

type PulseState = "healthy" | "degraded" | "failed";

type Props = {
  label: string;
  state: PulseState;
  hint?: string;
};

export function ManarPulse({ label, state, hint }: Props) {
  return (
    <div className={"manar-pulse state-" + state}>
      <span className="pulse-dot">
        <span className="pulse-ring" />
        <span className="pulse-ring second" />
      </span>
      <div className="pulse-body">
        <span className="pulse-label">{label}</span>
        {hint && <span className="pulse-hint">{hint}</span>}
      </div>
    </div>
  );
}
