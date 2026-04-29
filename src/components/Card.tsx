import { useEffect, useRef } from 'preact/hooks';
import './card.css';

interface CardProps {
  title?: string;
  children: any;
  style?: any;
  className?: string;
  headerAction?: any;
  tilt?: boolean;
}

const Card = ({ title, children, style, className, headerAction, tilt = false }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tilt) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 6}deg) translateZ(6px)`;
      el.style.transition = 'transform 60ms linear';
      el.style.boxShadow = `${-x * 12}px ${-y * 12}px 28px rgba(0,0,0,0.13)`;
    };

    const onLeave = () => {
      el.style.transform = '';
      el.style.boxShadow = '';
      el.style.transition = 'transform 400ms ease, box-shadow 400ms ease';
    };

    el.addEventListener('mousemove', onMove as EventListener);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove as EventListener);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [tilt]);

  return (
    <div ref={ref} className={'card' + (className ? ` ${className}` : '')} style={style}>
      {title && (
        <div className="card-title-row">
          <h2 className="card-title">{title}</h2>
          {headerAction && <div className="card-title-action">{headerAction}</div>}
        </div>
      )}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
