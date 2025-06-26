import { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";

const Header = ({ cartCount = 0, cartItems = [] }) => {
  const [authBtn, setAuthBtn] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const toggleAuth = () => setAuthBtn(!authBtn);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <header className="bg-[#010B1A] text-white sticky top-0 z-50 shadow-xl border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">


            <div className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="https://ik.imagekit.io/dpteeh56b/logo.png"
                  alt="Logo"
                  className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-sm"></div>
              </div>
            </div>



            <nav className="hidden md:flex items-center space-x-1">
              {[{ name: "Home", href: "/" }, { name: "Shop", href: "/shop" }].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-200 relative group"
                >
                  <span>{item.name}</span>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </a>
              ))}


              <div className="relative">
                <button
                  onClick={() => setShowCart(!showCart)}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <ShoppingCart size={18} />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-1 bg-yellow-500 text-black text-xs font-bold px-2 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
                {showCart && (
                  <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-lg z-50 p-4">
                    <h2 className="text-lg font-semibold mb-3">Cart Items</h2>
                    {cartItems.length === 0 ? (
                      <p>No items in cart.</p>
                    ) : (
                      <ul className="space-y-2 max-h-60 overflow-y-auto">
                        {cartItems.map((item, i) => (
                          <li key={i} className="flex justify-between border-b pb-1">
                            <span>{item.title}</span>
                            <span className="text-yellow-600">{item.price} KD</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </nav>


            <div className="hidden md:flex items-center gap-4">
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                onClick={toggleAuth}
              >
                <User size={18} />
                <span>{authBtn ? "Login" : "Logout"}</span>
              </button>
            </div>


            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </header>


      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}


      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-out z-50 md:hidden`}
      >

        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <img
              src="https://ik.imagekit.io/dpteeh56b/logo.png"
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="font-semibold text-lg">Menu</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>


        <div className="flex flex-col p-6 space-y-2 ">
          {[{ name: "Home", href: "/" }, { name: "Shop", href: "/shop" }].map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              onClick={toggleSidebar}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-200 transform hover:translate-x-1 ${
                index === 0 ? "animate-fade-in" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="font-medium">{item.name}</span>
            </a>
          ))}

          <div className="pt-6 mt-6 border-t border-slate-700/50">
            <button
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={() => {
                toggleAuth();
                toggleSidebar();
              }}
            >
              <User size={20} />
              <span>{authBtn ? "Login" : "Logout"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;