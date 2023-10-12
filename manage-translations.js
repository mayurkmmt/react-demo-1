// eslint-disable-next-line
const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: './build/messages',
  translationsDirectory: './src/translations',
  languages: ['en', 'es', 'sv'],
  singleMessagesFile: true,
});
