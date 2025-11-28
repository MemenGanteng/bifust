import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  HeartIcon,
  SearchIcon,
  UserIcon,
  CloseIcon,
} from '../components/Icons';

const FavoriteRecipientsScreen = ({ onNavigate, favorites, onRemoveFavorite }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const filteredFavorites = favorites.filter(fav =>
    fav.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fav.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fav.accountNumber.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
        <StatusBar />
        <div className="px-4 lg:px-8 py-4 flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-semibold">Penerima Favorit</h1>
        </div>

        {/* Stats */}
        <div className="px-4 lg:px-8 pb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <HeartIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-xs">Total Penerima Tersimpan</p>
                <p className="text-white text-2xl font-bold">{favorites.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 py-4">
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Cari nama, bank, atau nomor rekening..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon className="w-5 h-5" />
          </div>
        </div>

        {/* Favorites List */}
        {filteredFavorites.length > 0 ? (
          <div className="space-y-3">
            {filteredFavorites.map(fav => (
              <div
                key={fav.id}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  {/* Bank Logo */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                    style={{ backgroundColor: fav.bankColor }}
                  >
                    {fav.bankCode.slice(0, 4)}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{fav.name}</p>
                    <p className="text-sm text-gray-500 truncate">{fav.bankName}</p>
                    <p className="text-xs text-gray-400">{fav.accountNumber}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setShowDeleteConfirm(fav.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <CloseIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onNavigate('transferForm', { recipient: fav })}
                      className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl hover:bg-red-700 transition-all"
                    >
                      Transfer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-8 h-8 text-gray-400" />
            </div>
            {searchQuery ? (
              <>
                <p className="text-gray-500 font-medium">Tidak ditemukan</p>
                <p className="text-gray-400 text-sm mt-1">Coba kata kunci lain</p>
              </>
            ) : (
              <>
                <p className="text-gray-500 font-medium">Belum ada penerima favorit</p>
                <p className="text-gray-400 text-sm mt-1">Simpan penerima setelah transfer untuk akses cepat</p>
                <button
                  onClick={() => onNavigate('transferType')}
                  className="mt-4 px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-all"
                >
                  Mulai Transfer
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">Hapus dari Favorit?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              Penerima ini akan dihapus dari daftar favorit Anda.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-3 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onRemoveFavorite(showDeleteConfirm);
                  setShowDeleteConfirm(null);
                }}
                className="flex-1 py-3 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 transition-all"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipientsScreen;
