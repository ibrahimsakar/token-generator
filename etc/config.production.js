const config = {
    envType: 'production',
    app: {
        name: 'token-generator',
        version: '1.0.0',
        description: '',
    },
    jwt: {
        private: './etc/private.key',
        public: './etc/public.key',
    },
};

module.exports = config;
