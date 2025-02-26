import "./button.css";

interface ButtonProps {
  children: string;
  onClick: () => void;
  active: string;
}

export default function Button({ children, onClick, active }: ButtonProps) {
  return (
    <button className={`button_styles ${active}`} onClick={onClick}>
      {children}
    </button>
  );
}
