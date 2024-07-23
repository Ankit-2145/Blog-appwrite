import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: authStatus,
    },
    {
      name: "Sign In",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      slug: "/Signup",
      active: !authStatus,
    },
    {
      name: "All Notices",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Notice",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3">
      <Container>
        <nav className="flex">
          <div className="-mb-2">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex mx-auto items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-base inline-block text-black px-4 py-2 mr-2 duration-150 transition-all hover:text-white hover:bg-blue-500 font-medium rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="ml-auto">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
