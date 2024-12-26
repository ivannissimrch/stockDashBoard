import "./button.css";

interface ButtonProps {
  children: string;
  onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="button_styles" onClick={onClick}>
      {children}
    </button>
  );
}
