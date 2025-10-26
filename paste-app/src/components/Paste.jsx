import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utils/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  // Filter pastes based on search term (by title or content)
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="search-container">
          <input
            type="search"
            placeholder="Search paste here..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* All Pastes */}
        <div className="pastes-container">
          <h2 className="section-header">All Pastes</h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="note-card"
                >
                  <div className="note-content">
                    <div className="note-header">
                      {/* heading and Description */}
                      <div className="w-full flex flex-col space-y-3">
                        <p className="note-title">{paste?.title}</p>
                        <p className="note-preview">
                          {paste?.content}
                        </p>
                      </div>

                      {/* icons */}
                      <div className="flex flex-col gap-y-4 sm:items-end">
                        <div className="note-actions">
                          <button
                            className="action-button group hover:border-blue-400"
                          >
                            <a href={`/?pasteId=${paste?._id}`}>
                              <PencilLine
                                className="text-blue-300 group-hover:text-blue-100"
                                size={20}
                              />
                            </a>
                          </button>
                          <button
                            className="action-button group hover:border-red-400"
                            onClick={() => handleDelete(paste?._id)}
                          >
                            <Trash2
                              className="text-red-300 group-hover:text-red-100"
                              size={20}
                            />
                          </button>

                          <button className="action-button group hover:border-orange-400">
                            <a href={`#/pastes/${paste?._id}`}>
                              <Eye
                                className="text-orange-300 group-hover:text-orange-100"
                                size={20}
                              />
                            </a>
                          </button>
                          <button
                            className="action-button group hover:border-green-400"
                            onClick={() => {
                              navigator.clipboard.writeText(paste?.content);
                              toast.success("Copied to Clipboard");
                            }}
                          >
                            <Copy
                              className="text-green-300 group-hover:text-green-100"
                              size={20}
                            />
                          </button>
                        </div>

                        <div className="note-date">
                          <Calendar className="calendar-icon" size={20} />
                          {FormatDate(paste?.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                No Pastes Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;