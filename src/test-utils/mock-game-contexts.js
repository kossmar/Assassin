import { ASSASSIN_STATUS, GAME_STATUS, ROLE } from "../constants";

const default_game_context_status_CREATED = {
    game: {
        creator: 'default',
        creator_role: 'default',
        game_details: {
            game_name: 'default',
            weapons: 'default',
            safe_zones: 'default',
        },
        moderators: ['default'],
        assassins: [
            {
                user: 'default',
                target: null,
                is_waiting: false,
                kills: [],
                status: ASSASSIN_STATUS.ALIVE,
                dispute: null,
                rank_index: null // seems useless
            },
            {
                user: 'default',
                target: null,
                is_waiting: false,
                kills: [],
                status: ASSASSIN_STATUS.ALIVE,
                dispute: null,
                rank_index: null // seems useless
            }
        ],
        graveyard: [
            {
                user: 'default',
                kills: [],
                death_rank: 1 // equals graveyard.length + 1
            }
        ],
        game_status: GAME_STATUS.CREATED.STATUS,
        benchwarmers: [],
        join_requests: {
            assassins: [
                {
                    user: 'default',
                    role: ROLE.ASSASSIN
                }
            ],
            moderators: ['default'],
        },
        disputes: [],
        winner: null,
        invite_assassin_URL: 'default',
        invite_moderator_URL: 'default'
    },
    gameDetails: {
        game_name: 'default',
        weapons: 'default',
        safe_zones: 'default',
    },
    userState: {
        isEditing: false,
        isModerator: false,
        hasJoined: false,
        hasRequestedJoin: false,
        isCreator: false,
        roleSelection: ROLE.ASSASSIN,
        target: null,
        currentAssassin: null,
        status: null,
        killer: null,
        isDead: false,
        dispute: null
    },
    popupState: {
        delete: false,
        leave: false,
        join: false,
        start: false,
        adjudicate: false,
        dispute: false,
        didYouDie: false
    }
}

export default { default_game_context_status_CREATED }
