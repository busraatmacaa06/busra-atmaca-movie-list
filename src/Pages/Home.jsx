import { useState, useEffect } from 'react';

function Home() {
  // 💾 Sayfa ilk açıldığında localStorage'dan verileri çek
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('filmlerim');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [inputValue, setInputValue] = useState("");
  const [editingMovie, setEditingMovie] = useState(null);

  // 🔄 Her film listesi değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('filmlerim', JSON.stringify(movies));
  }, [movies]);

  const addMovie = () => {
    if (inputValue.trim() !== "") {
      if (editingMovie) {
        // Düzenleme İşlemi
        const updatedMovies = movies.map(movie =>
          movie.id === editingMovie.id ? { ...movie, name: inputValue } : movie
        );
        setMovies(updatedMovies);
        setEditingMovie(null);
      } else {
        // Yeni Ekleme İşlemi
        const newMovie = { id: Date.now(), name: inputValue }; // Math.random yerine Date.now daha güvenlidir
        setMovies([...movies, newMovie]);
      }
      setInputValue("");
    }
  };

  const deleteMovie = (id) => {
    const newMovies = movies.filter(movie => movie.id !== id);
    setMovies(newMovies);
  };

  const editMovie = (movie) => {
    setEditingMovie(movie);
    setInputValue(movie.name);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addMovie();
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            🎬 Film Listem
          </h1>
          {/* İSTEDİĞİN DEĞİŞİKLİK BURADA: */}
          <p className="text-xl text-slate-400 font-medium">Favori filmlerini ekle!</p>
          
          <div className="mt-4 text-sm text-emerald-400 bg-slate-800 px-6 py-2 rounded-full inline-block shadow-lg border border-slate-700">
            Toplam: <span className="font-bold text-white">{movies.length}</span> film
          </div>
        </div>
        
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl mb-8 border border-slate-700">
          <div className="flex gap-3">
            <input 
              className="flex-1 bg-slate-900 border-2 border-slate-700 p-4 rounded-xl text-lg text-white placeholder-slate-500 shadow-inner focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Film adı yaz... (Enter ile ekle)"
            />
            <button 
              onClick={addMovie}
              className="px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-emerald-500/20 transform hover:scale-105 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition-all duration-300"
            >
              {editingMovie ? 'Güncelle' : '➕ Ekle'}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {movies.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 opacity-50">🎥</div>
              <h3 className="text-2xl font-bold text-slate-500 mb-2">Henüz film yok</h3>
            </div>
          ) : (
            movies.map(movie => (
              <div key={movie.id} className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 border border-slate-700 flex justify-between items-center group">
                <div>
                  <span className="text-xl font-semibold text-slate-100">{movie.name}</span>
                  <span className="text-sm text-slate-500 block">ID: {movie.id.toString().slice(-6)}</span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button onClick={() => editMovie(movie)} className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-medium shadow-md transform hover:scale-105 transition-all duration-200">
                    ✏️
                  </button>
                  <button onClick={() => deleteMovie(movie.id)} className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg font-medium shadow-md transform hover:scale-105 transition-all duration-200">
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;