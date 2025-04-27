import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Modal, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("t");
    const [pass, setPass] = useState("t");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [warningModal, setWarningModal] = useState(false);
    const [warningReasons, setWarningReasons] = useState([]);
    const [pendingNavigation, setPendingNavigation] = useState(null);

    const CheckLogin = async () => {
        try {
            setLoading(true);
            setError("");

            // Query user directly with email and password
            const userSnapshot = await firestore()
                .collection('Users')
                .where('email', '==', email)
                .where('password', '==', pass)
                .get();

            if (userSnapshot.empty) {
                setError("Email hoặc mật khẩu không đúng");
                return;
            }

            const userData = userSnapshot.docs[0].data();

            if (userData.block) {
                setError("Tài khoản của bạn đã bị khóa");
                return;
            }

            // Save user ID
            await AsyncStorage.setItem('USERID', userData.userId);

            // Kiểm tra các loại báo cáo
            let allReasons = [];

            // Báo cáo tin nhắn
            const reportsChatSnap = await firestore()
                .collection('ReportsChat')
                .where('reportedUserId', '==', userData.userId)
                .get();
            if (!reportsChatSnap.empty) {
                const reasons = reportsChatSnap.docs.map(doc => doc.data().reason);
                allReasons.push(...reasons.map(r => `[Tin nhắn] ${r}`));
            }

            // Báo cáo bài viết
            const reportsPostSnap = await firestore()
                .collection('ReportPost')
                .where('reportedUserId', '==', userData.userId)
                .get();
            if (!reportsPostSnap.empty) {
                const reasons = reportsPostSnap.docs.map(doc => doc.data().reason);
                allReasons.push(...reasons.map(r => `[Bài viết] ${r}`));
            }

            // Báo cáo sản phẩm
            const reportsProductSnap = await firestore()
                .collection('ReportProduct')
                .where('reportedUserId', '==', userData.userId)
                .get();
            if (!reportsProductSnap.empty) {
                const reasons = reportsProductSnap.docs.map(doc => doc.data().reason);
                allReasons.push(...reasons.map(r => `[Sản phẩm] ${r}`));
            }

            if (allReasons.length > 0) {
                setWarningReasons(allReasons);
                setWarningModal(true);
                setPendingNavigation(userData.typeAcc === 0 ? 'HomeAd' : 'Tabbar');
                return;
            }

            if (userData.typeAcc === 0) {
                navigation.navigate('HomeAd');
            } else if (userData.typeAcc === 1) {
                navigation.navigate('Tabbar');
            }

        } catch (err) {
            console.error("Login error:", err);
            setError("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{
            backgroundColor: '#1d1d27',
            flex: 1,
        }}>
            <KeyboardAwareScrollView>
                <Image
                    source={require('../../../Img/tdmu_logo.png')}
                    style={{
                        marginTop: 40,
                        marginRight: 34,
                        width: 260,
                        height: 125,
                        resizeMode: 'stretch',
                        alignSelf: 'center',
                    }}
                />

                <Text
                    style={{
                        alignSelf: 'center',
                        marginTop: 50,
                        fontSize: 20,
                        fontWeight: '800',
                        color: 'red',
                        textAlign: 'center'
                    }}>
                    TRAO ĐỔI ĐỒ DÙNG TDMU
                </Text>

                {error ? (
                    <Text style={{
                        color: 'red',
                        textAlign: 'center',
                        marginTop: 10,
                    }}>
                        {error}
                    </Text>
                ) : null}

                <TextInput
                    value={email}
                    onChangeText={txt => {
                        setEmail(txt);
                    }}
                    placeholder="Gmail"
                    placeholderTextColor={'grey'}
                    keyboardType='email-address'
                    style={{
                        width: '84%',
                        height: 50,
                        borderRadius: 10,
                        borderWidth: 0.5,
                        alignSelf: 'center',
                        paddingLeft: 15,
                        marginTop: 45,
                        color: 'white',
                        backgroundColor: '#2a293b'
                    }}
                />
                <TextInput
                    value={pass}
                    onChangeText={txt => {
                        setPass(txt);
                    }}
                    placeholder="Mật khẩu"
                    placeholderTextColor={'grey'}
                    secureTextEntry={true}
                    style={{
                        width: '84%',
                        height: 50,
                        borderRadius: 10,
                        borderWidth: 0.5,
                        alignSelf: 'center',
                        paddingLeft: 15,
                        marginTop: 20,
                        color: 'white',
                        backgroundColor: '#2a293b'
                    }}
                />

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ForgotPass')
                    }}
                >
                    <Text style={{
                        marginTop: 10,
                        fontSize: 13,
                        alignSelf: 'center',
                        color: 'white',
                    }}>
                        Quên mật khẩu?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '60%',
                        height: 50,
                        backgroundColor: '#cb2a5c',
                        borderRadius: 40,
                        marginTop: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}
                    onPress={CheckLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={{ fontSize: 20, color: 'white', }}>Đăng nhập</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '84%',
                        height: 50,
                        borderRadius: 10,
                        marginTop: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}
                    onPress={() => {
                        navigation.navigate('Register');
                    }}>
                    <Text style={{ fontSize: 15, color: 'white', }}>
                        Đăng ký
                    </Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>

            {/* Modal cảnh báo bị report */}
            <Modal
                visible={warningModal}
                transparent
                animationType="slide"
                onRequestClose={() => setWarningModal(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '80%',
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        padding: 20,
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FCBB3C', marginBottom: 10 }}>
                            Cảnh báo tài khoản!
                        </Text>
                        <Text style={{ color: '#333', marginBottom: 10, textAlign: 'center' }}>
                            Tài khoản của bạn đang bị cảnh báo do các lý do sau:
                        </Text>
                        <FlatList
                            data={warningReasons}
                            keyExtractor={(_, idx) => idx.toString()}
                            renderItem={({ item, index }) => (
                                <Text style={{ color: '#d9534f', marginBottom: 5 }}>{index + 1}. {item}</Text>
                            )}
                        />
                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                backgroundColor: '#FCBB3C',
                                borderRadius: 8,
                                paddingVertical: 10,
                                paddingHorizontal: 30
                            }}
                            onPress={() => {
                                setWarningModal(false);
                                if (pendingNavigation) {
                                    navigation.navigate(pendingNavigation);
                                    setPendingNavigation(null);
                                }
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Đã hiểu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Login;