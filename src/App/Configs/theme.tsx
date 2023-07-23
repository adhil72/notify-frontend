const theme = (night: boolean) => {
    return {
        color: night ? '#ffffff' : '#000000',
        primary: '#3477eb',
        grey: night ? 'rgba(71, 71, 71, 0.466)' : 'rgba(211, 211, 211, 0.466)'
    }
}
export default theme