import React from 'react';
import { useTranslations } from 'next-intl';

const ComingSoonNotice: React.FC = () => {
  const t = useTranslations('HomePage');
  return (
    <div className="bg-blue-100 border border-blue-300 text-blue-700 p-4 rounded-lg text-center mt-6">
      <p className="text-lg font-semibold">
        🚀 {t('new')} 🚀
      </p>
    </div>
  );
};

export default ComingSoonNotice;
