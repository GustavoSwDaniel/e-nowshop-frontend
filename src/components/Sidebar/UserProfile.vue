<template>
    <div class="profile_content">
        <div class="profile">
            <div class="profile_details">
                <div class="user_info">
                    <div class="name">Gustavo</div>
                    <div class="position">Cargo</div>
                </div>
            </div>
            <i id="log_out">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
            </i>
        </div>
    </div>
</template>


<script>
export default {
    name: 'UserProfile'
}
</script>


<style lang="scss" scoped>
.profile_content {
    position: absolute;
    color: #fff;
    bottom: 0;
    left: 0;
    width: 100%;
}

.profile_content .profile {
    position: relative;
    padding: 10px 6px;
    height: 60px;
}

.profile_content .profile .profile_details {
    display: flex;
    align-items: center;
}

.profile .profile_details .info_user {
    margin-left: 10px;
}


.profile_details .info_user .name {
    font-size: 15px;
    font-weight: 400;
}

.profile_details .info_user .position {
    font-size: 12px;
}

.profile #log_out {
    position: absolute;
    left: 88%;
    bottom: 35%;
    transform: translateX(-50%);
    min-width: 50px;
    line-height: 50px;
}
</style>