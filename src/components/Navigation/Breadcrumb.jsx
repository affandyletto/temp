// src/components/Breadcrumb.jsx

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center space-x-3 text-sm text-secondary">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center space-x-3">
            {index > 0 && <ChevronRight className="size-4" />}
            {isLast ? (
              <span className="text-primary-200">{item.label}</span>
            ) : (
              <Link
                to={item.path}
                className={`${
                  index !== 0 ? "hover:underline" : "cursor-default"
                }`}
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
