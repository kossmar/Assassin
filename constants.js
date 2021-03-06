const page = {
    home: "home",
    about: "about",
    rules: "rules"
}

const GAME_STATUS = {
    CREATED: {
        STATUS: 'CREATED',
        MESSAGE: 'MURDER AND MAYHEM AWAITS...'
    },
    ACTIVE: {
        STATUS: 'ACTIVE',
        MESSAGE: "DON'T DIE"
    },
    PAUSED: {
        STATUS: 'PAUSED',
        MESSAGE: 'PAUSED UNTIL PEOPLE FIGURE OUT THEIR ISSUES'
    },
    COMPLETE: {
        STATUS: 'COMPLETE',
        MESSAGE: "ONLY ONE PERSON DIDN'T DIE"
    },
}


export { page, GAME_STATUS }