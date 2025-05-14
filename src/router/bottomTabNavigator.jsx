import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreateOffer, Home } from '../screen';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import homeIcon from '../assets/images/homeIcon.png'
import homeSelectedIcon from '../assets/images/homeSelectedIcon.png'
import addIcon from '../assets/images/addIcon.png'
import addSelectedIcon from '../assets/images/addSelectedIcon.png'
import user from '../assets/images/user.png'
import userIcon from '../assets/images/userIcon.png'
import Settings from '../screen/Settings';

const Tab = createBottomTabNavigator();

const tabConfig = [
    {
        name: "home",
        label: "Home",
        component: Home,
        icon: homeIcon,
        selectedIcon: homeSelectedIcon,
    },
    {
        name: "create-offer",
        label: "Create Offer",
        component: CreateOffer,
        icon: addIcon,
        selectedIcon: addSelectedIcon,
    },
    {
        name: "profile",
        label: "Profile",
        component: Settings,
        icon: userIcon,
        selectedIcon: user,
    },
]





const CustomTabBar = ({ state, descriptors, navigation, ...rest }) => {
    return (
        <View style={{ flexDirection: 'row', height: 60, backgroundColor: '#fff', justifyContent:"space-around", alignItems:'center' }} >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.title || route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const tab = tabConfig.find(t => t.name === route.name);
                if (!tab) return null;

                const iconSource = isFocused ? tab.selectedIcon : tab.icon;

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={{ flexBasis: "33%", alignItems: 'center', backgroundColor: 'transparent' }}
                    >
                        
                        {iconSource && <Image source={iconSource} height={20} width={20} style={{
                            height: 40,
                            width : 40
                        }} />}
                        </TouchableOpacity>
                );
            })}
        </View>
    );
};


const BottomTabs = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
        }}
            tabBar={(props) => <CustomTabBar {...props} />} 
        >
            {
                tabConfig.map((tab) => {
                    return <Tab.Screen key={tab.name} {...tab} options={{
                        title: tab.label,
                        tabBarIcon: tab.icon,
                        // seleletdIcon : tab.selectedIcon,
                         tabBarInactiveTintColor:'red',
                    }} name={tab.name} component={tab.component}  />
                })
            }
        </Tab.Navigator>
    );
};

export default BottomTabs;
