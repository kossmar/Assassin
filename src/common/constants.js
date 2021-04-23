export const page = {
    home: "home",
    about: "about",
    rules: "rules"
}

export const ROLE = {
    ASSASSIN: 'assassin',
    MODERATOR: 'moderator'
}

export const GAME_STATUS = {
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

export const ASSASSIN_STATUS = {
    ALIVE: 'ALIVE',
    PURGATORY: 'PURGATORY',
    DEAD: 'DEAD',
    DISPUTE: 'DISPUTE'
}

export const ASSASSIN_ICON_USE = {
    PROFILE: 'PROFILE',
    ROLE: 'ROLE',
    TARGET: {
        ALIVE: 'TARGET_ALIVE',
        CONFIRM: 'TARGET_CONFIRM',
        WAITING: 'TARGET_WAITING',
    },
    DISPLAY: 'DISPLAY'
}

export const DID_YOU_DIE = {
    MESSAGE: 'DID THIS PERSON KILL YOU?',
    CONFIRM: 'YES',
    DISPUTE: 'DISPUTE',
}




// export { page, GAME_STATUS, ASSASSIN_ICON_USE}