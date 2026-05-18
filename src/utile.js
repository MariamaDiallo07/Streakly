


export function calculateStreak(completionDates) {
    if(completionDates.length === 0) return 0
    const sorted = [...completionDates].sort().reverse()
    const today  = new Date().toISOString().split('T')[0]
    
    if(sorted[0] !== today) return 0

    let streak = 1
    for(let i =0; i<sorted.length-1;i++) {
        const current  = new Date(sorted[i])
        const next = new Date(sorted[i+1])
        const diffDays = (current-next) / (1000*60*60*24)
        if(diffDays === 1) streak++
        else break
    }
    return streak
}

export function calculateRate(completionDates) {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate()-30)
    const recent = completionDates.filter(d=> new Date(d) >= thirtyDaysAgo)
    return  Math.round((recent.length/30) * 100)
}