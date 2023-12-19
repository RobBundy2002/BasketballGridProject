const mongoose = require('mongoose')

const Schema = mongoose.Schema

const matrixSchema = new Schema({
    images: {
        type: [String],
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    answer: {
        type: [
            [
                {
                    awards: {
                        type: {
                            'national-champion': Boolean,
                            'ncaa-tournament-mop': Boolean,
                            'ncaa-all-tournament': Boolean,
                            'ncaa-all-region': Boolean,
                            'ap-poy': Boolean,
                            'all-conference-defense': Boolean,
                            'all-conference-team': Boolean,
                            'all-conference-tournament': Boolean,
                            'conference-dpoy': Boolean,
                            'conference-poy': Boolean,
                            'conference-roy': Boolean,
                            'conference-tournament-mvp': Boolean,
                            'consensus-all-america': Boolean,
                            'naismith-award': Boolean,
                            'wooden-award': Boolean
                        },
                        required: true,
                    },
                    career_averages: {
                        type: {
                            minutes_per_game: Number,
                            fg_per_game: Number,
                            fg_percentage: Number,
                            three_point_per_game: Number,
                            three_point_percentage: Number,
                            assists_per_game: Number,
                            blocks_per_game: Number,
                            d_rebounds_per_game: Number,
                            fouls_per_game: Number,
                            ft_per_game: Number,
                            ft_percentage: Number,
                            o_rebounds_per_game: Number,
                            points_per_game: Number,
                            rebounds_per_game: Number,
                            steals_per_game: Number,
                            turnovers_per_game: Number
                        },
                        required: true,
                    },
                    career_totals: {
                        type: {
                            games_played: Number,
                            games_started: Number,
                            minutes_played: Number,
                            field_goals_made: Number,
                            three_point_made: Number,
                            assists: Number,
                            blocks: Number,
                            defensive_rebounds: Number,
                            fouls: Number,
                            free_throws_made: Number,
                            offensive_rebounds: Number,
                            points: Number,
                            rebounds: Number,
                            steals: Number,
                            turnovers: Number
                        },
                        required: true,
                    },
                    conferences: {
                        type: [String],
                        required: true,
                    },
                    drafted: {
                        type: Boolean,
                        required: true,
                    },
                    jersey_numbers: {
                        type: [String],
                        required: true,
                    },
                    name: {
                        type: String,
                        required: true,
                    },
                    season_averages: {
                        type: {
                            minutes_per_game: Number,
                            fg_per_game: Number,
                            fg_percentage: Number,
                            three_point_per_game: Number,
                            three_point_percentage: Number,
                            assists_per_game: Number,
                            blocks_per_game: Number,
                            d_rebounds_per_game: Number,
                            fouls_per_game: Number,
                            ft_per_game: Number,
                            ft_percentage: Number,
                            o_rebounds_per_game: Number,
                            points_per_game: Number,
                            rebounds_per_game: Number,
                            steals_per_game: Number,
                            turnovers_per_game: Number
                        },
                        required: true,
                    },
                    season_totals: {
                        type: {
                            games_played: Number,
                            games_started: Number,
                            minutes_played: Number,
                            field_goals_made: Number,
                            three_point_made: Number,
                            assists: Number,
                            blocks: Number,
                            defensive_rebounds: Number,
                            fouls: Number,
                            free_throws_made: Number,
                            offensive_rebounds: Number,
                            points: Number,
                            rebounds: Number,
                            steals: Number,
                            turnovers: Number
                        },
                        required: true,
                    },
                    teams: {
                        type: [String],
                        required: true,
                    },
                    years_played: {
                        type: [String],
                        required: true,
                    },
                },
            ]
        ],
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Matrix', matrixSchema)