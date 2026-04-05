import { Link, useLocation } from "react-router-dom";
import { Home, Library } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "الرئيسية", icon: Home },
    { to: "/curricula", label: "المناهج", icon: Library },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="العب وتعلم" className="h-12 w-12 object-contain" />
          <span className="text-lg font-bold text-foreground font-amiri">
            العب وتعلم
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
